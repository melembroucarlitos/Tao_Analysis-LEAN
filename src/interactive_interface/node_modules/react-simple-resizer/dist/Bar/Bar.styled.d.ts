import * as React from 'react';
import { ExpandInteractiveArea } from '../types';
export declare type StyledBarProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: number;
};
export declare const StyledBar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    size?: number | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export declare type StyledInteractiveAreaProps = React.HTMLAttributes<HTMLDivElement> & ExpandInteractiveArea & {
    vertical: boolean;
};
export declare const StyledInteractiveArea: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & ExpandInteractiveArea & {
    vertical: boolean;
} & React.RefAttributes<HTMLDivElement>>;
