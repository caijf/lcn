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

declare const baseData: BaseData[];
declare const formData: FormData[];

declare module 'lcn' {
  export default baseData;
}

declare module 'lcn/data' {
  export default baseData;
}

declare module 'lcn/area' {
  export default baseData;
}

declare module 'lcn/city' {
  export default baseData;
}

declare module 'lcn/province' {
  export default baseData;
}

declare module 'lcn/lcn-form' {
  export default formData;
}

declare module 'lcn/lcn-form-pc' {
  export default formData;
}

declare module 'lcn/lcn-form-inland' {
  export default formData;
}

declare module 'lcn/lcn-inland' {
  export default formData;
}