import React from "react";

export function createReactElement(el:any){
    type JsonType = {
        type?: string;
        key: any;
        ref: any;
        props: {
          children?: JsonType[] | string[];
        };
      };
    
      function createReactElementFromJson(json: JsonType): React.ReactNode {
        const { type, props, key, ref,  } = json;
    
        const { children, ...rest } = props;
    
        const childElements = (children || []).map(child => {
          if (typeof child === "string") {
            return child;
          } else {
            return createReactElementFromJson(child);
          }
        });
    
        return React.createElement(
          type!,
          { key, ref, ...rest },
          ...childElements
        );
      }
    
      return createReactElementFromJson(el);
}