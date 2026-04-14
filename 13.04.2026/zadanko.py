from pathlib import Path


def read_graph(file_path: Path) -> tuple[int, list[list[int]]]:
    with open(file_path) as file:
        return int(file.readline()), [list(map(int, line.split())) for line in file]


def write_neighbours_list(vertices_neighbours_list: list[list[int]]):
    print("\n".join(f"Sąsiadami wierzchołka {neighbours_list[0]} są {', '.join(map(str, neighbours_list[1:]))}" for neighbours_list in vertices_neighbours_list))


def list_to_matrix(adjacency_list: list[list[int]]) -> list[list[int]]:
    n = len(adjacency_list)
    matrix = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in adjacency_list[i]:
            matrix[i][j] = 1
    print(matrix)
    return matrix


def write_matrix(matrix: list[list[int]]):
    print("\n".join(" ".join(map(str, line)) for line in matrix))


def main():
    list = read_graph(Path("graph.txt"))  # funkcja przyjmuje nazwę pliku i zwraca listy sąsiedztwa oraz ilość wierzchołków
    number_of_vertices, adjacency_list = list
    write_neighbours_list(adjacency_list) # funkcja przyjmuję listę sąsiedztwa i wypisuje ją na ekran w formacie "Sąsiadami wierzchołka X są: a, b, c"
    matrix = list_to_matrix(adjacency_list) # funkcja przyjmuje listę sąsiedztwa i zwraca macierz sąsiedztwa
    write_matrix(matrix)  # funkcja przyjmue macierz sąsiedztwa i wypisuje ją na ekran


if __name__ == "__main__":
    main() # funkcja podstawowa, wywoływana jeżeli uruchomiono plik
