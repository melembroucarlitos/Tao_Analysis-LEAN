import * as React from 'react';
import { Resizer } from './Resizer';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    vertical?: boolean;
    onActivate?: () => void;
    beforeApplyResizer?: (resizer: Resizer) => void;
    afterResizing?: () => void;
}
declare class Container extends React.PureComponent<Props> {
    private readonly childrenProps;
    private readonly childrenInstance;
    private readonly barActions$;
    private readonly sizeRelatedInfoAction$;
    private readonly sizeRelatedInfo$;
    private readonly axis;
    private readonly dimension;
    private readonly contextValue;
    private readonly containerProps;
    componentDidMount(): void;
    render(): JSX.Element;
    getResizer(): Resizer;
    applyResizer(resizer: Resizer): void;
    private monitorBarStatusChanges;
    private triggerBarAction;
    private createID;
    private populateChildInstance;
    private refreshSizeInfos;
    private makeSizeInfos;
}
export { Container, Resizer, Props as ContainerProps };
