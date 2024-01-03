export class NextFormData {
  constructor(
    private readonly formData: FormData,
  ) { }

  public getString(key: string): string | null {
    const value = this.formData.get(key);

    if (value === null) {
      return null;
    }

    if (typeof value !== 'string') {
      return null;
    }

    return value;
  }

  public getNumber(key: string): number | null {
    const value = this.getString(key);

    if (value === null) {
      return null;
    }

    const valueParsed = parseInt(value);

    if (isNaN(valueParsed)) {
      return null;
    }

    return valueParsed;
  }

  public getBoolean(key: string): boolean {
    const value = this.getString(key);

    if (value === null) {
      return false;
    }

    return true;
  }
}