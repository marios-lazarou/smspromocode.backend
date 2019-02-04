export class Globals {
    public static GET_TELEPHONE_NUMBER_REG_EXPRESSION(): RegExp {
        return new RegExp(/^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
    }
    
    public static getSmsMessage(): string {
        return new Date().getHours() < 12
            ? 'Good morning! Your promocode is AM123'
            : 'Hello! Your promocode is PM456'
    }
}