interface BaseData {
  code: string;
  name: string;
  children?: BaseData[];
}

interface FormData {
  value: string;
  label: string;
  children?: FormData[];
}

export declare const baseData: BaseData[];
export declare const formData: FormData[];