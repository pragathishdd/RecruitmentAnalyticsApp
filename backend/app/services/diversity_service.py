def diversity_analysis(df):

    if "Gender" not in df.columns:
        return {}

    male = len(
        df[
            df["Gender"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "male"
        ]
    )

    female = len(
        df[
            df["Gender"]
            .astype(str)
            .str.strip()
            .str.lower()
            == "female"
        ]
    )

    total = male + female

    diversity_percentage = (
        round(
            (female / total) * 100,
            2,
        )
        if total > 0
        else 0
    )

    diversity_ratio = (
        round(
            female / male,
            2,
        )
        if male > 0
        else 0
    )

    return {
        "male": male,
        "female": female,
        "total": total,
        "diversity_percentage":
            diversity_percentage,
        "diversity_ratio":
            diversity_ratio,
    }