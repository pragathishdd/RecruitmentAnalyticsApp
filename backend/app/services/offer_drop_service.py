def offer_drop_analysis(df):

    if "TA Status" not in df.columns:
        return {}

    offer_dropped = len(
        df[
            df["TA Status"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "offer dropped"
        ]
    )

    offer_accepted = len(
        df[
            df["TA Status"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "offer accepted"
        ]
    )

    joined = len(
        df[
            df["TA Status"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "joined"
        ]
    )

    offers_released = (
        offer_dropped
        + offer_accepted
        + joined
    )

    drop_percentage = (
        round(
            (
                offer_dropped
                / offers_released
            ) * 100,
            2,
        )
        if offers_released > 0
        else 0
    )

    join_conversion_percentage = (
        round(
            (
                joined
                / offers_released
            ) * 100,
            2,
        )
        if offers_released > 0
        else 0
    )

    acceptance_percentage = (
        round(
            (
                (
                    offer_accepted
                    + joined
                )
                / offers_released
            ) * 100,
            2,
        )
        if offers_released > 0
        else 0
    )

    return {
        "offer_dropped":
            offer_dropped,

        "drop_percentage":
            drop_percentage,

        "offers_released":
            offers_released,

        "join_conversion_percentage":
            join_conversion_percentage,

        "acceptance_percentage":
            acceptance_percentage,
    }