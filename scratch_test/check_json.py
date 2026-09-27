import json

with open('scratch_test/monthly_performance.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

js_data = json.dumps(data, ensure_ascii=False)
print("Data length:", len(data))
print("First 2:", data[:2])
