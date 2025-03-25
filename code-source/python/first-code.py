# Déclaration des variables
texte = "Bonjour"
entier = 42
decimal = 3.14

# Affichage des types
print(
    f"Type de texte : {type(texte)}, Type de entier : {type(entier)}, Type de decimal : {type(decimal)}"
)

# Affichage des variables sur une même ligne
print(f"{texte} {entier} {decimal}")

# Affichage des variables sur des lignes différentes
print(f"{texte}\n{entier}\n{decimal}")

# Affichage des variables avec des espaces
print(f"{texte} {entier} {decimal}")

# Affichage des variables avec des tabulations
print(f"{texte}\t{entier}\t{decimal}")

# Affichage des variables avec des séparateurs
print(f"{texte} | {entier} | {decimal}")

# Affichage des variables avec des séparateurs personnalisés
print(f"{texte} -> {entier} -> {decimal}")
