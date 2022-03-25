import argparse
from datetime import datetime
from datetime import timedelta

import github


DAYS_DEFINED_AS_STALE = 30


def prune_stale_branches(access_token: str) -> None:
    """Find all isolated stale branches and delete them."""

    github_inst = github.Github(access_token)
    repo = github_inst.get_repo('petal-engineering/shared')

    branches_to_delete = []
    for branch in repo.get_branches():
        if check_isolated_branch(repo, branch.name):
            branches_to_delete.append(branch.name)

    # delete the branches
    for branch_name in branches_to_delete:
        print(f"Will delete head/{branch_name}!")
        # ref = repo.get_git_ref(f"heads/{branch_name}")
        # ref.delete()


def check_isolated_branch(repo: github.Repository.Repository, branch_name: str) -> bool:
    """Check if a branch is old and not associated with open PRs."""

    # find all commits in the branch
    commits = repo.get_commits(sha=branch_name)
    # find the latest commit
    latest_commit = max(
        commits, key=lambda commit: commit.commit.committer.date)
    # find out if the latest commit is older than our time range
    latest_commit_timestamp = latest_commit.commit.committer.date
    if datetime.today() - latest_commit_timestamp > timedelta(days=DAYS_DEFINED_AS_STALE):
        pull_requests = latest_commit.get_pulls()
        # not associated with any open PR
        return all([pr.state == 'closed' for pr in pull_requests])
    # ignore if branch is recent
    return False


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--access_token",
        default="",
        help="Github access token.",
    )
    args = parser.parse_args()
    prune_stale_branches(args.access_token)
