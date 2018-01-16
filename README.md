# Export vocabulary from kindle to CSV file
Reads vocab.db from kindle or specified location and exports the words and usage to specified CSV file.

## Setup
Go to you local workspace and install required run-time npm packages.
```shell
$npm install
```

## Usage
Run with default vocabulary db file(`D:/system/vocabulary/vocab.db`) and CSV file(`vocabulary.csv`)
```shell
$node index.js
```

Run with specified vocabulary db file
```shell
$node index.js vocab.db
```