export interface NavTabContentType {
  name: string;
  iconClassName: string;
}

export interface NavTabType extends NavTabContentType {
  isSelected: boolean;
}
