import * as React from 'react';
import { ChildProps, ResizerContext } from './types';
export declare const ResizerProvider: React.ProviderExoticComponent<React.ProviderProps<ResizerContext>>, ResizerConsumer: React.ExoticComponent<React.ConsumerProps<ResizerContext>>;
export declare function withResizerContext<T extends ChildProps>(Target: React.ComponentType<T>): (props: Pick<T, Exclude<keyof T, "context">>) => JSX.Element;
