import * as React from 'react';
import { ChildProps } from '../types';
export declare type StyledSectionProps = React.HTMLAttributes<HTMLDivElement> & Pick<ChildProps, 'context' | 'maxSize' | 'minSize'> & {
    flexGrow: number;
    flexShrink: number;
    flexBasis: number;
};
export declare const StyledSection: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & Pick<ChildProps, "context" | "maxSize" | "minSize"> & {
    flexGrow: number;
    flexShrink: number;
    flexBasis: number;
} & React.RefAttributes<HTMLDivElement>>;
