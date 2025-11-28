#!/usr/bin/env python3
"""
Filter SSA baby names data to only include names with at least 100 total occurrences.
This creates a more manageable dataset while still including a wide variety of names.
"""

import pandas as pd
from pathlib import Path

# Configuration
MIN_TOTAL_OCCURRENCES = 1000
INPUT_FILE = "static/data/ssa_babynames.csv"  # Original unfiltered data
OUTPUT_FILE = "static/data/ssa_babynames_filtered.csv"  # Will be overwritten

def filter_names(input_path, output_path, min_occurrences=100):
    """Filter baby names data to only include names above threshold."""

    print(f"Reading data from {input_path}...")
    df = pd.read_csv(input_path)

    print(f"Original data: {len(df):,} rows, {df['name'].nunique():,} unique names")

    # Calculate total occurrences per name
    print("Calculating totals per name...")
    name_totals = df.groupby('name')['n'].sum()

    # Filter to names with at least min_occurrences
    print(f"Filtering to names with at least {min_occurrences:,} total occurrences...")
    names_to_keep = name_totals[name_totals >= min_occurrences].index

    # Filter the dataframe
    df_filtered = df[df['name'].isin(names_to_keep)]

    print(f"Filtered data: {len(df_filtered):,} rows, {df_filtered['name'].nunique():,} unique names")
    print(f"Reduction: {(1 - len(df_filtered)/len(df)) * 100:.1f}% fewer rows")

    # Save filtered data
    print(f"Saving to {output_path}...")
    df_filtered.to_csv(output_path, index=False)

    # Calculate file sizes
    input_size = Path(input_path).stat().st_size / (1024 * 1024)  # MB
    output_size = Path(output_path).stat().st_size / (1024 * 1024)  # MB

    print(f"\nFile size comparison:")
    print(f"  Original: {input_size:.2f} MB")
    print(f"  Filtered: {output_size:.2f} MB")
    print(f"  Reduction: {(1 - output_size/input_size) * 100:.1f}%")

    print("\nDone! ✓")

if __name__ == "__main__":
    # Check if input file exists
    if not Path(INPUT_FILE).exists():
        print(f"Error: Input file not found: {INPUT_FILE}")
        print("\nPlease update INPUT_FILE in the script to point to your original SSA data.")
        print("Common locations:")
        print("  - static/data/ssa_babynames.csv")
        print("  - data/ssa_babynames.csv")
        exit(1)

    # Create output directory if it doesn't exist
    Path(OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)

    # Run the filter
    filter_names(INPUT_FILE, OUTPUT_FILE, MIN_TOTAL_OCCURRENCES)
