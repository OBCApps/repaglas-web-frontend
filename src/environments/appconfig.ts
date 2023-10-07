import { Inject, Injectable } from '@angular/core';
import { NotFoundError, Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class AppConfig {

    private config: any = null;
    private env: any = null;

    constructor(private http: HttpClient) {
    }

    getHttp(): HttpClient {
        return this.http;
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('./assets/config/proxy/env.json').pipe(
                map(res => res)).pipe(catchError((error: any): any => {
                    resolve(true);
                  //  return Observable.throw(error.json().error || 'Server error');
                    return throwError( new NotFoundError(error) )
                }))
                .subscribe((envResponse) => {
                    this.env = envResponse;
                    const request: any = null;
                    if (request) {
                        request
                            .map((res: Response)=> res.json())
                            .catch((error: any) => {
                                resolve(error);
                               // return Observable.throw(error.json().error || 'Server error');
                               return throwError( new NotFoundError(error) )
                            })
                            .subscribe((responseData:any) => {
                                this.config = responseData;
                                resolve(true);
                            });
                    } else {
                        resolve(true);
                    }
                });

        });
    }
}
