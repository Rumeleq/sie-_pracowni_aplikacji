def main():
    with open("sygnaly.txt", "r", encoding="utf-8") as f:
        result_text = ""
        for i, word in enumerate(f.readlines()):
            if (i + 1) % 40 == 0 and i != 0:
                result_text += word.strip()[9]
        print(result_text)

    with open("wyniki4.txt", "w+") as f:
        f.write(f"Zadanie 4.1: {result_text}")

    with open("sygnaly.txt", "r", encoding="utf-8") as f:
        longest_unique_letter_word = ""
        for word in f.readlines():
            if len(longest_unique_letter_word) < len(set(word.strip())):
                longest_unique_letter_word = word.strip()
        print(longest_unique_letter_word, len(set(longest_unique_letter_word)))

    with open("wyniki4.txt", "a") as f:
        f.write(f"\nZadanie 4.2: {longest_unique_letter_word} {len(set(longest_unique_letter_word))}")

    with open("sygnaly.txt", "r", encoding="utf-8") as f:
        list_of_complying_words: list[str] = []
        for word in f.readlines():
            current_word_complies = True
            for char1 in word.strip():
                if not current_word_complies: break
                for char2 in word.strip():
                    if abs(ord(char1.lower()) - ord(char2.lower())) > 10:
                        current_word_complies = False
                        break
            if current_word_complies:
                list_of_complying_words.append(word.strip())
        print(list_of_complying_words)

    with open("wyniki4.txt", "a") as f:
        f.write(f"\nZadanie 4.3:\n{'\n'.join(list_of_complying_words)}")


if __name__ == "__main__":
    main()
    