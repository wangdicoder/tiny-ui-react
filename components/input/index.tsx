import Input, { InputProps, InputSizes } from './input';
import InputGroup, { InputGroupProps } from './input-group';
import InputGroupAddon, { InputGroupAddonProps } from './input-group-addon';

export { InputProps, InputSizes, InputGroupProps, InputGroupAddonProps };

type IInput = typeof Input & {
  Group: typeof InputGroup;
  Addon: typeof InputGroupAddon;
};

const DefaultInput = Input as IInput;
DefaultInput.Group = InputGroup;
DefaultInput.Addon = InputGroupAddon;

export default DefaultInput;
