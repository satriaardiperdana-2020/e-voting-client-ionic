#e-voting-client-ionic prepared by Satria Ardi Perdana

Server : https://github.com/satriaardiperdana-2020/e-voting-server.git

domain test versi web dan API : https://evoting.codesatria.com/ login pemilih: username: 3344556677889910, password: 3344556677889910 (bisa untuk login versi mobile) login admin: username: admin1. password: admin (bisa untuk login versi mobile)

cara test postman login admin: pada postman pilih method post dan isi urlnya https://evoting.codesatria.com/api/admin/login, pada body isikan request sbb: {"username":"admin1","password":"admin"}

Akan dapat response: { "status": true, "message": "Login Berhasil", "data": { "id": "2", "username": "admin1", "level": "admin" } }

untuk api yang lain urlnya bisa dilihat pada https://github.com/satriaardiperdana-2020/e-voting-client-ionic/blob/main/src/app/remote-service.service.ts

Jika ingin dijalankan silakan checkout source server dan import script sql berikut: https://github.com/satriaardiperdana-2020/e-voting-server/blob/main/ci-voting.sql, kemudian masuk ke folder project client dan jalankan client dengan perintah:
ionic cordova run android --liveload --consolelogs


apk source ini: https://drive.google.com/drive/folders/1mwwKY0wtzkmuENreu4tSwQbSCxBFmAg1?usp=sharing
video demo versi mobile dan web: https://drive.google.com/drive/folders/1dNv1AVEKtWXR7MveVIKYYR2QuhCS2_xz?usp=sharing
