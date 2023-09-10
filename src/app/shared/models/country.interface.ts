export interface Country {
    name: {
        common: string;
        official: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        }
    };
    flag: string;
    coatOfArms: {
        png: string;
        svg: string;
    }
    capital: string[];
    region: string;
    languages: { [key: string]: string };
    population: number;
    fifa: string;
    timezones: string[];
}
