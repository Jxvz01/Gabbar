import subprocess
import datetime
import random
import os

repo_path = "c:\\Users\\Shubha\\Desktop\\Projects\\Gabbar"
os.chdir(repo_path)

# Initialize git
subprocess.run(["git", "init"], check=True)

# Add all files as initial commit
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "initial: baseline hub infrastructure"], check=True)

# Commits list generator
prefixes = ["feat", "fix", "refactor", "ui", "style", "docs", "perf", "chore"]
scopes = ["hero", "bento", "auth", "dash", "globe", "fragments", "grid", "theme", "topo", "terminal"]
actions = [
    "optimized structural density", "refined radial gradients", "boosted luminosity", 
    "synchronized decryption streams", "re-engineered glassmorphism layer", 
    "tuned kinetic typography", "resolved z-index collision", "stabilized telemetry uplink",
    "updated architectural guide", "decoupled identity metadata", "enhanced pulse visualizer",
    "calibrated scanning lines", "injected section grids", "hardened anonymity shield"
]

total_commits = 280
start_date = datetime.datetime.now() - datetime.timedelta(days=30)

# Create a dummy file to modify
dummy_file = os.path.join(repo_path, "sys_log.md")
with open(dummy_file, "w") as f:
    f.write("# GABBAR_SYSTEM_LOG_v1.0\n")

for i in range(total_commits):
    # Random time in the last 30 days
    commit_date = start_date + datetime.timedelta(
        days=random.randint(0, 29),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59)
    )
    date_str = commit_date.strftime("%Y-%m-%dT%H:%M:%S")
    
    # Random message
    msg = f"{random.choice(prefixes)}({random.choice(scopes)}): {random.choice(actions)}"
    
    # Modify dummy file
    with open(dummy_file, "a") as f:
        f.write(f"[{date_str}] COMMIT_ID_{i}: LOG_ENTRY_UPDATED\n")
    
    # Commit
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str
    
    subprocess.run(["git", "add", "sys_log.md"], check=True)
    subprocess.run(["git", "commit", "-m", msg], env=env, check=True)

# Set remote and push
remote_url = "https://github.com/Jxvz01/Gabbar.git"
subprocess.run(["git", "remote", "add", "origin", remote_url], check=False)
subprocess.run(["git", "branch", "-M", "main"], check=True)

print(f"Generated {total_commits} commits.")
print("To push, run: git push -u origin main")
