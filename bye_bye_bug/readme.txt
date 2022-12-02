Plan proiect:

 - Implementarea unui sistem de login;
 - Delimitarea utilizatorilor in functie de rolul pe care il au in proiect (membru proiect sau tester);
 - Creare formularului de inregistrare a bug-ului;
 - Accesarea bug-urilor, alocarea acestora catre membrii proiectelor;

 Am implementat serviciul RESTful; 
 Putem afisa tot continutul tabelelor prin request de tip get; (ex: http://localhost:3000/api/accounts)
 Putem afisa individual fiecare inregistrare din baza de date prin request de tip get folosind id-ul; 
                                    (ex:http://localhost:3000/api/accounts/3f0388bc-1a18-41ad-8cf7-2486681dd41a)
 De asemenea, putem introduce introduce o noua inregistrare printr-un post, 
                                    specificand in body-ul request-ului email-ul, parola si tipul acountului;
                                    gasim in header-ul response-ului locatia inregistrarii
                                    (ex:   http://localhost:3000/api/accounts
                                            {  
                                            "email":"alexandrescuvlad123@gmail.com",
                                            "password":"145689v",
                                            "accountType":"MP"
                                            }
                                    )
 Mai mult, putem inlocui o intregistrare din tabele prin put; 
                    (ex:  http://localhost:3000/api/accounts/30fa9325-629a-4920-aaee-0e069b39e3f8
                        {
                        "email":"alexandrescuvlad123@gmail.com",
                        "password":"1456891011va",
                        "accountType":"MP"
                        }
                    )
 Putem modifica anumite atribute dintr-o inregistrare prin patch;
                    (ex: http://localhost:3000/api/accounts/30fa9325-629a-4920-aaee-0e069b39e3f8
                        {
                        "password":"1456891011valexandrescu"
                        }
                    )
 Putem verifica existenta unei inregistrari in functie de id prin head;
                    (ex: http://localhost:3000/api/accounts/30fa9325-629a-4920-aaee-0e069b39e3f8)
 Si putem sterge o inregistrare dintr-o tabela sau o tabela prin delete. 
                    (ex: http://localhost:3000/api/accounts/30fa9325-629a-4920-aaee-0e069b39e3f8 pentru stergerea unei inregistrari,
                         http://localhost:3000/api/accounts pentru stergerea tot continutului dintr-o tabela)