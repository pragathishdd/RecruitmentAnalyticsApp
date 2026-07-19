def offer_drop_analysis(df):

    if "TA Status" not in df.columns:
        return {}

    total_profiles = len(df)

    offer_dropped = len(
        df[df["TA Status"] == "Offer Dropped"]
    )

    drop_percentage = (
        round(
            (offer_dropped / total_profiles) * 100,
            2
        )
        if total_profiles > 0
        else 0
    )

    return {
        "offer_dropped": offer_dropped,
        "drop_percentage": drop_percentage
    }