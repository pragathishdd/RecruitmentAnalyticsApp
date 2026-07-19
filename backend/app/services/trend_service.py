import pandas as pd


def hiring_trend(df):

    trends = {
        "monthly": [],
        "quarterly": [],
        "yearly": [],
    }

    required_columns = [
        "Joining Date",
        "Final Select Date",
        "TA Status",
    ]

    if not all(
        column in df.columns
        for column in required_columns
    ):
        return trends

    df["Joining Date"] = pd.to_datetime(
        df["Joining Date"],
        errors="coerce",
    )

    df["Final Select Date"] = pd.to_datetime(
        df["Final Select Date"],
        errors="coerce",
    )

    joined_df = df[
        df["TA Status"]
        .astype(str)
        .str.strip()
        .str.lower()
        == "joined"
    ]

    dropped_df = df[
        df["TA Status"]
        .astype(str)
        .str.strip()
        .str.lower()
        == "offer dropped"
    ]

    # ==========================
    # Monthly Trend
    # ==========================

    monthly_joined = (
        joined_df.groupby(
            joined_df["Joining Date"]
            .dt.to_period("M")
        )
        .size()
        .reset_index(name="joined")
    )

    monthly_dropped = (
        dropped_df.groupby(
            dropped_df["Final Select Date"]
            .dt.to_period("M")
        )
        .size()
        .reset_index(name="offer_dropped")
    )

    start_month = min(
        df["Joining Date"].min(),
        df["Final Select Date"].min(),
    )

    end_month = max(
        df["Joining Date"].max(),
        df["Final Select Date"].max(),
    )

    all_months = pd.period_range(
        start=start_month,
        end=end_month,
        freq="M",
    )

    monthly = pd.DataFrame({
        "period": all_months.astype(str)
    })

    monthly["joined"] = 0
    monthly["offer_dropped"] = 0

    for _, row in monthly_joined.iterrows():

        monthly.loc[
            monthly["period"]
            == str(row["Joining Date"]),
            "joined",
        ] = int(row["joined"])

    for _, row in monthly_dropped.iterrows():

        monthly.loc[
            monthly["period"]
            == str(row["Final Select Date"]),
            "offer_dropped",
        ] = int(
            row["offer_dropped"]
        )

    trends["monthly"] = (
        monthly.to_dict(
            orient="records"
        )
    )

    # ==========================
    # Quarterly Trend
    # ==========================

    quarterly_joined = (
        joined_df.groupby(
            joined_df["Joining Date"]
            .dt.to_period("Q")
        )
        .size()
        .reset_index(name="joined")
    )

    quarterly_dropped = (
        dropped_df.groupby(
            dropped_df["Final Select Date"]
            .dt.to_period("Q")
        )
        .size()
        .reset_index(name="offer_dropped")
    )

    all_quarters = pd.period_range(
        start=start_month,
        end=end_month,
        freq="Q",
    )

    quarterly = pd.DataFrame({
        "period": all_quarters.astype(str)
    })

    quarterly["joined"] = 0
    quarterly["offer_dropped"] = 0

    for _, row in quarterly_joined.iterrows():

        quarterly.loc[
            quarterly["period"]
            == str(row["Joining Date"]),
            "joined",
        ] = int(row["joined"])

    for _, row in quarterly_dropped.iterrows():

        quarterly.loc[
            quarterly["period"]
            == str(row["Final Select Date"]),
            "offer_dropped",
        ] = int(
            row["offer_dropped"]
        )

    trends["quarterly"] = (
        quarterly.to_dict(
            orient="records"
        )
    )

    # ==========================
    # Yearly Trend
    # ==========================

    start_year = min(
        df["Joining Date"].dt.year.min(),
        df["Final Select Date"].dt.year.min(),
    )

    end_year = max(
        df["Joining Date"].dt.year.max(),
        df["Final Select Date"].dt.year.max(),
    )

    yearly = pd.DataFrame({
        "period": list(
            range(
                int(start_year),
                int(end_year) + 1,
            )
        )
    })

    yearly["joined"] = 0
    yearly["offer_dropped"] = 0

    yearly_joined = (
        joined_df.groupby(
            joined_df["Joining Date"]
            .dt.year
        )
        .size()
        .reset_index(name="joined")
    )

    yearly_dropped = (
        dropped_df.groupby(
            dropped_df["Final Select Date"]
            .dt.year
        )
        .size()
        .reset_index(name="offer_dropped")
    )

    for _, row in yearly_joined.iterrows():

        yearly.loc[
            yearly["period"]
            == int(row["Joining Date"]),
            "joined",
        ] = int(row["joined"])

    for _, row in yearly_dropped.iterrows():

        yearly.loc[
            yearly["period"]
            == int(row["Final Select Date"]),
            "offer_dropped",
        ] = int(
            row["offer_dropped"]
        )

    yearly["period"] = (
        yearly["period"]
        .astype(str)
    )

    trends["yearly"] = (
        yearly.to_dict(
            orient="records"
        )
    )

    return trends