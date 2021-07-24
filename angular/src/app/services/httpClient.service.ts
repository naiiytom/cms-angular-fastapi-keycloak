import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public sendGetFaqPackageNames() {
    return this.http.get<any>(`${ API_ENDPOINT }/get_mtl_health_insur`).toPromise();
  }

  public sendGetKBPackageNames() {
    return this.sendGetFaqPackageNames();
  }

  public sendPostFaqData(body) {
    return this.http.post(`${ API_ENDPOINT }/update_faqs`, body, this.httpOptions).toPromise();
  }

  public sendPostKBData(body) {
    return this.http.post(`${ API_ENDPOINT }/update_kb`, body, this.httpOptions).toPromise();
  }

  public sendGetFaqDataByPackageName(size, from, package_name) {
    const params = {
      'size': size,
      'from': from,
      'package_name': package_name,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/get_faqs`, { params: params }).toPromise();
  }

  public sendGetKBDataByPackageName(size, from, package_name) {
    const params = {
      'size': size,
      'from': from,
      'package_name': package_name,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/get_kb`, { params: params }).toPromise();
  }

  public sendGetSynonymDictionary(size, from) {
    const params = {
      'size': size,
      'from': from,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/get_synonym_dictionary`, { params: params }).toPromise();
  }

  public sendGetAddSynonym(word, synonym) {
    const params = {
      'word': word,
      'synonym': synonym,
    };
    return this.http.get(`${ API_ENDPOINT }/add_synonym`, { params: params }).toPromise();
  }

  public sendPostEditSynonym(body) {
    return this.http.post(`${ API_ENDPOINT }/edit_synonym`, body, this.httpOptions).toPromise();
  }

  public sendGetDeleteSynonymByWord(word) {
    const params = { 'word': word };
    return this.http.get(`${ API_ENDPOINT }/delete_synonym`, { params: params }).toPromise();
  }

  public sendGetDeleteFAQByIDAndPackage(id, package_name) {
    const params = {
      'id': id,
      'pacakge_name': package_name,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/delete_faq`, { params: params }).toPromise();
  }

  public editFAQSpecificRow(body) {
    return this.http.post<any>(`${ API_ENDPOINT }/edit_faq`, body, this.httpOptions).toPromise();
  }

  public sendGetExportHistory(filename) {
    return this.http.get(`${ API_ENDPOINT }/export_history?filename=${ filename }`).toPromise();
  }

  public sendGetEditHistory(size, from) {
    const params = {
      'size': size,
      'from': from,
    };
    return this.http.get(`${ API_ENDPOINT }/get_edit_history`, { params: params }).toPromise();
  }

  public sendPostEditHistory(body) {
    return this.http.post(`${ API_ENDPOINT }/create_backup_history`, body, this.httpOptions).toPromise();
  }

  public sendGetPremiumTableByPackageName(size, from, package_name) {
    const params = {
      'size': size,
      'from': from,
      'package_name': package_name,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/get_premium_table`, { params: params }).toPromise();
  }

  public sendPostPremiumTableData(body) {
    return this.http.post(`${ API_ENDPOINT }/update_priceindex`, body, this.httpOptions).toPromise();
  }

  public sendGetPremiumTableTemplateByPackageName(package_name) {
    return this.http.get(`${ API_ENDPOINT }/export_premium_table?package_name=${ package_name }`).toPromise();
  }

  public sendGetDiseaseTableDataByPackageName(size, from, package_name) {
    const params = {
      'size': size,
      'from': from,
      'package_name': package_name,
    };
    return this.http.get<any>(`${ API_ENDPOINT }/get_disease_table`, { params: params }).toPromise();
  }

  public sendPostDiseaseTableData(body) {
    return this.http.post(`${ API_ENDPOINT }/update_disease_table`, body, this.httpOptions).toPromise();
  }

  public sendGetDiseaseTableTemplateByPackageName(package_name) {
    return this.http.get(`${ API_ENDPOINT }/export_disease_table?package_name=${ package_name }`).toPromise();
  }
}
