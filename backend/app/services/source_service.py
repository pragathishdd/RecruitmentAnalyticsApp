def source_performance(df):

    if "Source" not in df.columns:
        return []

    result = []

    for source in df["Source"].dropna().unique():

        source_df = df[df["Source"] == source]

        total = len(source_df)

        joined = len(
            source_df[
                source_df["TA Status"] == "Joined"
            ]
        )

        dropped = len(
            source_df[
                source_df["TA Status"] == "Offer Dropped"
            ]
        )

        result.append({
            "source": source,
            "profiles": total,
            "joined": joined,
            "offer_dropped": dropped
        })

    return result