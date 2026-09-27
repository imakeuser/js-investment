import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import json

def excel_date_to_str(serial):
    try:
        val = float(serial)
        # Excel's 1900 date system leap year bug adjustment (1899-12-30)
        base = datetime(1899, 12, 30)
        dt = base + timedelta(days=val)
        return dt.strftime('%Y-%m')
    except:
        return str(serial)

z = zipfile.ZipFile('spop_db/월별투자성과현황_2609.xlsx')
shared = []
if 'xl/sharedStrings.xml' in z.namelist():
    content = z.read('xl/sharedStrings.xml')
    tree = ET.fromstring(content)
    for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        t = si.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
        shared.append(t.text if t is not None else '')

sheet_tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
ns = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

rows = []
for row in sheet_tree.findall('.//s:row', ns):
    r_idx = int(row.attrib.get('r'))
    row_vals = {}
    for cell in row.findall('s:c', ns):
        r = cell.attrib.get('r')
        col = ''.join([c for c in r if c.isalpha()])
        t = cell.attrib.get('t')
        v = cell.find('s:v', ns)
        val = v.text if v is not None else None
        if t == 's' and val is not None:
            val = shared[int(val)]
        row_vals[col] = val
    rows.append((r_idx, row_vals))

data = []
for r_idx, r_dict in rows:
    # Check if A is a valid date number
    a_val = r_dict.get('A')
    if not a_val:
        continue
    try:
        f_date = float(a_val)
        if f_date < 40000 or f_date > 50000:
            continue
    except ValueError:
        continue
    
    date_str = excel_date_to_str(a_val)
    data.append({
        'date': date_str,
        'base_eval': float(r_dict.get('B', 0) or 0),
        'end_eval': float(r_dict.get('C', 0) or 0),
        'profit_loss': float(r_dict.get('D', 0) or 0),
        'adj_eval': float(r_dict.get('E', 0) or 0),
        'return_rate': float(r_dict.get('F', 0) or 0),
        'deposit': float(r_dict.get('G', 0) or 0),
        'withdrawal': float(r_dict.get('H', 0) or 0),
        'stock_in': float(r_dict.get('I', 0) or 0),
        'stock_out': float(r_dict.get('J', 0) or 0),
    })

# Sort ascending by date (from 2017-10 to 2026-09)
data.sort(key=lambda x: x['date'])

# Compute cumulative profit and cumulative net deposit
cum_profit = 0
cum_deposit = 0
for item in data:
    cum_profit += item['profit_loss']
    cum_deposit += (item['deposit'] - item['withdrawal'] + item['stock_in'] - item['stock_out'])
    item['cum_profit'] = cum_profit
    item['cum_deposit'] = cum_deposit

with open('scratch_test/monthly_performance.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated {len(data)} monthly performance entries.")
print("First 3:", data[:3])
print("Last 3:", data[-3:])
