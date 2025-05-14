# EncuentroColegios
 

# codigo python por si acaso
original=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", " ", ",", "."]
copia=["f","r","j","b","o","x","v","i","d","z","k","c","w","q","s","m","u","a","n","t","g","l","h","y","e","p", " ", ",", "."]

frase = "cf jdroanovgadbfb qs on nscs tojqscsvdf, ndqs tfwrdoq moansqfn. onto ftoqts f csn ngaxdntfn bo iswras. toqvf jgdbfbs jsq csn mdaftfn dqxsawftdjsn. qs ifvf jcdj oq loqtfqfn owoavoqton fcoftsadfn."
fraseF = ""
flag = 0

while flag < len(frase):
    fraseF= fraseF + copia[original.index(frase[flag])]
    flag +=1
print(fraseF)
    