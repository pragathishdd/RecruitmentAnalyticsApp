
def joined_analysis(df):

    if "TA Status" not in df.columns:
        return {}

    joined_df = df[
        df["TA Status"] == "Joined"
    ]

    return {
        "total_joined": len(joined_df)
    }
