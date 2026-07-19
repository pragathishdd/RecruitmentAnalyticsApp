import pandas as pd


def recruiter_performance(df):

    if "Recruiter Name" not in df.columns:
        return []

    result = []

    recruiters = (
        df["Recruiter Name"]
        .dropna()
        .unique()
    )

    for recruiter in recruiters:

        recruiter_df = (
            df[
                df["Recruiter Name"] == recruiter
            ]
        )

        total = len(recruiter_df)

        joined = len(
            recruiter_df[
                recruiter_df["TA Status"]
                == "Joined"
            ]
        )

        dropped = len(
            recruiter_df[
                recruiter_df["TA Status"]
                == "Offer Dropped"
            ]
        )

        accepted = len(
            recruiter_df[
                recruiter_df["TA Status"]
                == "Offer Accepted"
            ]
        )

        join_ratio = (
            round((joined / total) * 100, 2)
            if total
            else 0
        )

        conversion_ratio = (
            round(
                ((joined + accepted) / total)
                * 100,
                2,
            )
            if total
            else 0
        )

        result.append(
            {
                "recruiter": recruiter,
                "profiles": total,
                "joined": joined,
                "offer_dropped": dropped,
                "offer_accepted": accepted,
                "join_ratio": join_ratio,
                "conversion_ratio": conversion_ratio,
            }
        )

    return result