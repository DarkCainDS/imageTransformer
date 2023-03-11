import bcrypt

texto_plano = "contraseña123"

# Generar una sal aleatoria
sal = bcrypt.gensalt()

# Generar hash de la contraseña utilizando la sal
hash_contraseña = bcrypt.hashpw(texto_plano.encode('utf-8'), sal)

print(hash_contraseña)
