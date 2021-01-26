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

export const baseData: BaseData[];
export const formData: FormData[];