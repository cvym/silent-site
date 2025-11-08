# Roblox Account Console Tool (simulated)

import random
import time

ADJECTIVES = [
    "Cyber", "Neon", "Shadow", "Quantum", "Crimson", "Silent", "Rapid", "Frozen",
    "Dark", "Electric", "Turbo", "Pixel", "Binary", "Glitched", "Swift", "Hyper",
    "Nova", "Echo", "Storm", "Phantom", "Sonic", "Night", "Void", "Laser", "Viral"
]

TECH_WORDS = [
    "Runner", "Specter", "Pulse", "Circuit", "Tracer", "Flux", "Ranger", "Breaker",
    "Phaser", "Cipher", "Shard", "Beacon", "Matrix", "Node", "Spike", "Crawler",
    "Defender", "Charger", "Sentry", "Warden", "Surge", "Rift", "Rider", "Striker"
]

PASSWORD = "Kiyun002"


def slow_print(text: str, delay: float = 0.012) -> None:
    """Print text character by character for a console effect."""
    for char in text:
        print(char, end="", flush=True)
        time.sleep(delay)
    print()


def make_random_username() -> str:
    adjective = random.choice(ADJECTIVES)
    tech_word = random.choice(TECH_WORDS)
    suffix = random.randint(1000, 999999)
    return f"{adjective}{tech_word}{suffix}"


def output_line(text: str) -> None:
    print(text, flush=True)


def menu_prompt(title: str) -> int:
    slow_print(title)
    choice = input("> ")
    try:
        return int(choice)
    except ValueError:
        slow_print("[!] Invalid number. Operation cancelled.")
        return 0


def follow_user_flow() -> None:
    amount = menu_prompt("\n[Follow User] Enter follower amount:")
    if amount <= 0:
        return

    output_line(f"\nStarting follow task for {amount} accounts...")

    for _ in range(amount):
        follower = make_random_username()
        output_line(f"{follower} -> Followed target successfully.")
        time.sleep(0.01)

    output_line("\n[OK] Follow task completed.\n")


def generator_flow() -> None:
    amount = menu_prompt("\n[Account Generator] Enter amount to create:")
    if amount <= 0:
            return

    output_line(f"\nGenerating {amount} accounts...")

    for _ in range(amount):
        user = make_random_username()
        output_line(f"Account generated -> user: {user} | password: {PASSWORD}")
        time.sleep(0.01)

    output_line("\n[OK] Account batch completed.\n")


def main() -> None:
    slow_print("=== Roblox Account Console ===", 0.012)
    slow_print("1: Follow target user")
    slow_print("2: Generate accounts")
    slow_print("0: Exit\n")

    option = input("> ")

    if option == "1":
        follow_user_flow()
    elif option == "2":
        generator_flow()
    elif option == "0":
        slow_print("\nSession closed.\n", 0.01)
    else:
        slow_print("\n[!] Invalid option. Choose 1, 2 or 0.\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        slow_print("\nSession interrupted.\n", 0.01)
