def vertical_analysis(df):

    if "Vertical" not in df.columns:
        return []

    results = []

    for vertical in df["Vertical"].dropna().unique():

        vertical_df = df[
            df["Vertical"] == vertical
        ]

        results.append({
            "vertical": vertical,
            "profiles": len(vertical_df),
            "joined": len(
                vertical_df[
                    vertical_df["TA Status"]
                    == "Joined"
                ]
            ),
            "offer_dropped": len(
                vertical_df[
                    vertical_df["TA Status"]
                    == "Offer Dropped"
                ]
            )
        })

    return results