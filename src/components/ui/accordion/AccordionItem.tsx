'use client';
import React from 'react';
import Collapsible from '../collapsible/Collapsible';
import styles from './Accordion.module.scss';
import { AccordionItemProps } from './accordion.types';
import clsx from 'clsx';

const AccordionItem: React.FC<AccordionItemProps> = React.memo(
   ({
      content,
      icon,
      label,
      value,
      disabled = false,
      isLast,
      isFirst,
      trailingContent,
      isActive,
      toggleItem,
   }) => {
      return (
         <div
            className={clsx(styles['accordion-item'], {
               [styles.isLast]: isLast,
               [styles.isFirst]: isFirst,
               [styles.isActive]: isActive,
            })}
            data-accordion-item
         >
            <Collapsible
               value={isActive}
               trigger={
                  <div
                     className={clsx(styles['accordion-header'], {
                        [styles.disabled]: disabled,
                     })}
                     data-accordion-header
                     onClick={() => !disabled && toggleItem(value)}
                  >
                     <div
                        className={clsx(styles['row'], {
                           [styles.disabled]: disabled,
                        })}
                        data-accordion-row
                     >
                        {icon && (
                           <span data-accordion-icon className='flexCenter'>
                              {icon({
                                 className: clsx(
                                    'flexCenter',
                                    { [styles['rotate-180']]: isActive },
                                    styles['accordion-icon'],
                                 ),
                              })}
                           </span>
                        )}
                        <span data-accordion-label className={styles.label}>
                           {label}
                        </span>
                     </div>

                     {typeof trailingContent == 'function'
                        ? trailingContent({ isActive })
                        : trailingContent}
                  </div>
               }
            >
               <div
                  data-accordion-content
                  className={styles['accordion-content']}
               >
                  {content}
               </div>
            </Collapsible>
         </div>
      );
   },
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
