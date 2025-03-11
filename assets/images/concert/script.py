import os
import re

# Get all files in the directory
files = [f for f in os.listdir() if re.match(r'concert(\d+)\.jpg', f)]

# Sort files in descending order to prevent overwriting
files.sort(key=lambda f: int(re.search(r'(\d+)', f).group()), reverse=True)

for file in files:
    match = re.search(r'(\d+)', file)
    if match:
        number = int(match.group(1)) + 1
        new_name = f"concert{number}.jpg"
        os.rename(file, new_name)
        print(f"Renamed: {file} -> {new_name}")

print("Renaming completed!")
