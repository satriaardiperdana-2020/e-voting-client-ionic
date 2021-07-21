import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class Calon {
  id_calon: string;
  foto: string;
  nik: string;
  nama: string;
  motto: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  alamat: string;
}
export class Laporan {
  id_calon: string;
  foto: string;
  nik: string;
  nama: string;
  motto: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  alamat: string;
  voting: string;
}
export class PerolehanSuara {
  id_calon: string;
  foto: string;
  nik: string;
  nama: string;
  motto: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  alamat: string;
  voting: string;
}
export class Pemilih {
  id_pemilih: string;
  nik: string;
  nama: string;
}
@Injectable({
  providedIn: 'root'
})
export class RemoteServiceService {

  // endpoint = 'https://pemasukanpengeluaran.000webhostapp.com/';
  // endpoint = 'http://localhost:8080/';
  endpoint = 'https://evoting.codesatria.com/';
  // endpoint = 'http://127.0.0.1:8080/';
  headers = {'Content-Type': 'application/x-www-form-urlencoded'};

  constructor(
    private httpClient: HttpClient,  
    private router: Router
  ) { }

  loginAdmin(username: string, password: string){
    let body = {
      username : username,
      password : password,
    }
    
    return this.httpClient.post(this.endpoint+"api/admin/login", JSON.stringify(body));
    
  }

  getCalon(): Observable<Calon[]> {
    return this.httpClient.get<Calon[]>(this.endpoint+"api/admin/calon")
      .pipe(
        tap(calons => console.log('Calon retrieved!')),
        catchError(this.handleError<Calon[]>('Get Calon', []))
      );
  }

  getCalonID(id_calon): Observable<Calon[]> {
    let body = {
      id_calon : id_calon
    }
    return this.httpClient.post<Calon[]>(this.endpoint+"api/admin/calon" + '/detail', JSON.stringify(body))
      .pipe(
        tap(pemasukan => console.log(`Calon get: ${id_calon}`)),
        catchError(this.handleError<Calon[]>(`Detail Calon id=${id_calon}`))
      );
  }

  addCalon(foto: string, nik: string, nama: string, 
    motto: string, jenis_kelamin: string, tanggal_lahir: string, tempat_lahir: string, alamat: string){
    let body = {
      foto : foto,
      nik : nik,
      nama : nama,
      motto : motto,
      jenis_kelamin : jenis_kelamin,
      tanggal_lahir : tanggal_lahir,
      tempat_lahir : tempat_lahir,
      alamat : alamat,
    }
    
    return this.httpClient.post(this.endpoint+"api/admin/calon/add", JSON.stringify(body));
    
  }

  updateCalon(id_calon:string,foto: string, nik: string, nama: string, 
    motto: string, jenis_kelamin: string, tanggal_lahir: string, tempat_lahir: string, alamat: string){
    let body = {
      id_calon: id_calon,
      foto : foto,
      nik : nik,
      nama : nama,
      motto : motto,
      jenis_kelamin : jenis_kelamin,
      tanggal_lahir : tanggal_lahir,
      tempat_lahir : tempat_lahir,
      alamat : alamat,
    }
    
    return this.httpClient.post(this.endpoint+"api/admin/calon/update", JSON.stringify(body));
    
  }

  deleteCalon(id_calon){
    let body = {
      id_calon : id_calon
    }
    return this.httpClient.post(this.endpoint+"api/admin/calon" + '/delete', JSON.stringify(body));
  }

  pilihCalon(id_calon:string,id_pemilih:string){
    let body = {
      id_calon: id_calon,
      id_pemilih : id_pemilih,
    }
    
    return this.httpClient.post(this.endpoint+"api/pemilih/calon/pilih", JSON.stringify(body));
    
  }
  cekNIKCalon(nik: string){
    let body = {
      nik : nik,
    }
    
    return this.httpClient.post(this.endpoint+"api/admin/calon/cek_nik", JSON.stringify(body));
    
  }

  getLaporan(): Observable<Laporan[]> {
    return this.httpClient.get<Laporan[]>(this.endpoint+"api/admin/laporan")
      .pipe(
        tap(calons => console.log('Laporan retrieved!')),
        catchError(this.handleError<Laporan[]>('Get Laporan', []))
      );
  }

  getPemilih(): Observable<Pemilih[]> {
    return this.httpClient.get<Pemilih[]>(this.endpoint+"api/admin/pemilih")
      .pipe(
        tap(pemilihs => console.log('Pemilih retrieved!')),
        catchError(this.handleError<Pemilih[]>('Get Pemilih', []))
      );
  }

  loginPemilih(nik: string, password: string){
    let body = {
      nik : nik,
      password : password,
    }
    
    return this.httpClient.post(this.endpoint+"api/pemilih/login", JSON.stringify(body));
    
  }

  getCalonPemilih(): Observable<Calon[]> {
    return this.httpClient.get<Calon[]>(this.endpoint+"api/pemilih/calon")
      .pipe(
        tap(calons => console.log('Calon retrieved!')),
        catchError(this.handleError<Calon[]>('Get Calon', []))
      );
  }

  getPerolehanSuara(): Observable<PerolehanSuara[]> {
    return this.httpClient.get<PerolehanSuara[]>(this.endpoint+"api/pemilih/perolehan_suara")
      .pipe(
        tap(calons => console.log('Calon retrieved!')),
        catchError(this.handleError<PerolehanSuara[]>('Get PerolehanSuara', []))
      );
  }

  getCalonIDPemilih(id_calon): Observable<Calon[]> {
    let body = {
      id_calon : id_calon
    }
    return this.httpClient.post<Calon[]>(this.endpoint+"api/pemilih/calon" + '/detail', JSON.stringify(body))
      .pipe(
        tap(pemasukan => console.log(`Calon get: ${id_calon}`)),
        catchError(this.handleError<Calon[]>(`Detail Calon id=${id_calon}`))
      );
  }

  cekNIK(nik: string){
    let body = {
      nik : nik,
    }
    
    return this.httpClient.post(this.endpoint+"api/pemilih/cek_nik", JSON.stringify(body));
    
  }

  daftarPemilih(nik: string,nama : string, password: string){
    let body = {
      nik : nik,
      nama : password,
      password : password,
    }
    
    return this.httpClient.post(this.endpoint+"api/pemilih/daftar", JSON.stringify(body));
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}
