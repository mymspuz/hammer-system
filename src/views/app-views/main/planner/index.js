import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import InnerAppLayout from "../../../../layouts/inner-app-layout";
import { Upload, Col, Button } from "antd";
import { CloudDownloadOutlined, UploadOutlined } from '@ant-design/icons';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class MySave extends React.Component {
    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(this.props.dataLayout)], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "mySetting.txt";
        document.body.appendChild(element);
        element.click();
    }
    render() {
        return (
                <Button
                    icon={<CloudDownloadOutlined/>}
                    onClick={this.downloadTxtFile}
                >
                    Сохранить план
                </Button>
        );
    }
}

class ToolBoxItem extends React.Component {
    render() {
        return (
            <div
                className="toolbox__items__item"
                onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
            >
                <img src={`/img/planner/plan${this.props.item.i}.png`} alt="avatar" className="img-fluid" />
            </div>
        );
    }
}

class ToolBox extends React.Component {
    render() {
        return (
            <div className="toolbox">
                <div className="toolbox__items">
                    {this.props.items.map(item => (
                        <ToolBoxItem
                            key={item.i}
                            item={item}
                            onTakeItem={this.props.onTakeItem}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default class ToolboxLayout extends React.Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        isResizable: false,
        onLayoutChange: function() {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: generateLayout()
    };

    state = {
        currentBreakpoint: "lg",
        compactType: null,
        mounted: false,
        layouts: { lg: this.props.initialLayout },
        layout: null,
        toolbox: { lg: [] }
    };

    componentDidMount() {
        this.setState({ mounted: true });
        this.state.layouts[this.state.currentBreakpoint].forEach(e => this.onPutItem(e))
    }

    onBreakpointChange = breakpoint => {
        this.setState(prevState => ({
            currentBreakpoint: breakpoint,
            toolbox: {
                ...prevState.toolbox,
                [breakpoint]:
                prevState.toolbox[breakpoint] ||
                prevState.toolbox[prevState.currentBreakpoint] ||
                []
            }
        }));
    };

    onTakeItem = item => {
        this.setState(prevState => ({
            toolbox: {
                ...prevState.toolbox,
                [prevState.currentBreakpoint]: prevState.toolbox[
                    prevState.currentBreakpoint
                    ].filter(({ i }) => i !== item.i)
            },
            layouts: {
                ...prevState.layouts,
                [prevState.currentBreakpoint]: [
                    ...prevState.layouts[prevState.currentBreakpoint],
                    item
                ]
            }
        }));
    };

    onPutItem = item => {
        this.setState(prevState => {
            return {
                toolbox: {
                    ...prevState.toolbox,
                    [prevState.currentBreakpoint]: [
                        ...(prevState.toolbox[prevState.currentBreakpoint] || []),
                        item
                    ]
                },
                layouts: {
                    ...prevState.layouts,
                    [prevState.currentBreakpoint]: prevState.layouts[
                        prevState.currentBreakpoint
                        ].filter(({ i }) => i !== item.i)
                }
            };
        });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layouts, layout });
    };

    generateDOM() {
        return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
            return (
                <div key={l.i} style={{backgroundColor: '#eee'}}>
                    <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
                        &times;
                    </div>
                    <img src={`/img/planner/plan${l.i}.png`} alt="avatar" className="img-fluid" />
                </div>
            );
        });
    }

    beforeUpload = file => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                const result = JSON.parse(e.target.result)
                this.state.layout.forEach(l => this.onPutItem(l))
                result.forEach(l => this.onTakeItem(l))
            };
        });
    }

    render() {

        return (
            <>
            <Col xs={24} sm={24} md={24} lg={16}>
                <MySave dataLayout={this.state.layout}/>
                <Upload beforeUpload={this.beforeUpload}>
                    <Button>
                        <UploadOutlined /> Загрузить план
                    </Button>
                </Upload>
            </Col>
            <div className="chat">
                <InnerAppLayout
                    sideContent={
                        <ToolBox
                            items={this.state.toolbox[this.state.currentBreakpoint] || []}
                            onTakeItem={this.onTakeItem}
                        />
                    }
                    mainContent={
                        <ResponsiveReactGridLayout
                            {...this.props}
                            layouts={this.state.layouts}
                            onBreakpointChange={this.onBreakpointChange}
                            onLayoutChange={this.onLayoutChange}
                            // WidthProvider option
                            measureBeforeMount={false}
                            useCSSTransforms={this.state.mounted}
                            compactType={this.state.compactType}
                            preventCollision={!this.state.compactType}
                        >
                            {this.generateDOM()}
                        </ResponsiveReactGridLayout>
                    }
                    sideContentWidth={450}
                    sideContentGutter={false}
                    border
                />
            </div>
            </>
        );
    }
}

function generateLayout() {
    return _.map(_.range(0, 5), function(item, i) {
        return {
            x: 0,
            y: 0,
            w: 1,
            h: 4,
            i: i.toString(),
            static: false
        };
    });
}

// if (process.env.STATIC_EXAMPLES === true) {
//     import("../test-hook.jsx").then(fn => fn.default(ToolboxLayout));
// }