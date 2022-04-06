export interface DefaultFieldInputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {}

export interface DefaultFieldTextareaProps
  extends Pick<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {}

export interface DefaultFieldSelectProps
  extends Pick<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'onChange'
  > {}
