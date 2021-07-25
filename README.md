#e-voting-client-ionic prepared by Satria Ardi Perdana

Server : https://github.com/satriaardiperdana-2020/e-voting-server.git

domain test versi web dan API : https://evoting.codesatria.com/ login pemilih: username: 3344556677889910, password: 3344556677889910 (bisa untuk login versi mobile) login admin: username: admin1. password: admin (bisa untuk login versi mobile)

cara test postman login admin: pada postman pilih method post dan isi urlnya https://evoting.codesatria.com/api/admin/login, pada body isikan request sbb: {"username":"admin1","password":"admin"}

Akan dapat response: { "status": true, "message": "Login Berhasil", "data": { "id": "2", "username": "admin1", "level": "admin" } }

untuk api yang lain urlnya bisa dilihat pada https://github.com/satriaardiperdana-2020/e-voting-client-ionic/blob/main/src/app/remote-service.service.ts
