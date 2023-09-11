import { CurrenciesObject } from "./currencies-object.interface";

export interface Country {
    name: {
        common: string;
        official: string;
    };
    currencies: CurrenciesObject;
    flag: string;
    coatOfArms: {
        png: string;
        svg: string;
    };
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    }
    capital: string[];
    region: string;
    languages: { [key: string]: string };
    population: number;
    fifa: string;
    timezones: string[];
}
