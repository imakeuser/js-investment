import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

def excel_date_to_str(serial):
    try:
        val = float(serial)
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
        # col letter:
        col = ''.join([c for c in r if c.isalpha()])
        t = cell.attrib.get('t')
        v = cell.find('s:v', ns)
        val = v.text if v is not None else None
        if t == 's' and val is not None:
            val = shared[int(val)]
        row_vals[col] = val
    rows.append((r_idx, row_vals))

header = rows[0][1]
print("HEADER:", header)

data = []
for r_idx, r_dict in rows[2:]: # skip row 2 if empty
    date_val = excel_date_to_str(r_dict.get('A'))
    data.append({
        'date': date_val,
        'raw_date': r_dict.get('A'),
        'eval_amount': float(r_dict.get('B', 0) or 0),
        'prev_eval': float(r_dict.get('C', 0) or 0),
        'profit_loss': float(r_dict.get('D', 0) or 0),
        'adj_eval': float(r_dict.get('E', 0) or 0),
        'return_rate': float(r_dict.get('F', 0) or 0),
        'deposit': float(r_dict.get('G', 0) or 0),
        'withdrawal': float(r_dict.get('H', 0) or 0),
        'stock_in': float(r_dict.get('I', 0) or 0),
        'stock_out': float(r_dict.get('J', 0) or 0),
    })

print("TOTAL ROWS:", len(data))
print("FIRST 5:")
for d in data[:5]:
    print(d)
print("LAST 5:")
for d in data[-5:]:
    print(d)
