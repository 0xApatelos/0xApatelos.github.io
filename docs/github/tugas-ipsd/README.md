# Indonesian Text Clustering Exploration

A learning project exploring **TF-IDF + K-Means** for Indonesian text, using
Python and Metaflow. The main workflow is `scale_and_kmeans.py`.

## Pipeline

1. Read an Excel file with a `message` column.
2. Lowercase text, remove URLs/punctuation/numbers, tokenize, and remove Indonesian stopwords.
3. Build unigram/bigram TF-IDF features (`min_df=2`, `max_df=0.95`).
4. Run K-Means with 3, 4, and 5 clusters (`random_state=42`, `n_init=10`).
5. Export row-level labels and summaries containing cluster sizes and top terms.

## Try with synthetic data

Use a local environment and synthetic/anonymized input. Do not publish real chat
messages, personal information, or private exports.

```bash
git clone https://github.com/0xApatelos/tugas-ipsd.git
cd tugas-ipsd
python -m venv .venv
# Linux/macOS; on Windows activate .venv using its Scripts directory
source .venv/bin/activate
pip install metaflow pandas scikit-learn nltk openpyxl
```

Create `sample.xlsx` containing a `message` column with enough varied Indonesian
messages (at least five documents, with repeated terms across documents). Then:

```bash
python scale_and_kmeans.py run --input_file sample.xlsx --output_file results.xlsx
```

Outputs:

- `results.xlsx` — messages and cluster assignments.
- `results_analysis.xlsx` — sizes, percentages, and representative terms.

The script downloads NLTK resources (`punkt`, `punkt_tab`, and `stopwords`), so
internet access is required on first use. The above commands are based on source
inspection; this README does not claim the pipeline has been reproduced in a
clean environment or that dependencies have been version-pinned.

## Limitations

- This is unsupervised exploration, not a validated text classifier.
- Cluster labels are numerical; interpreting topics requires human review.
- TF-IDF thresholds can produce an empty vocabulary on small or repetitive data.
- The script does not currently report silhouette scores, benchmark alternative
  methods, or measure performance. Do not present unmeasured accuracy claims.

## Recommended next steps

- Add a small synthetic dataset, pinned dependencies, and a preprocessing test.
- Compare cluster counts with silhouette scores and document failure cases.
- Audit existing data files and Git history before highlighting this repository:
  do not expose private conversations or personal data.
