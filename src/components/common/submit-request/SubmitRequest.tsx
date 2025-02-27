'use client';
import React from 'react';
import styles from './SubmitRequest.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { boolSliceAction } from '@/redux/slices/bool.slices';

const SubmitRequest: React.FC = () => {
   const dispatch = useAppDispatch();
   const { isSubmitRequest } = useAppSelector(s => s.bool);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Form Submitted');
   };

   return (
      <AnimatePresence>
         {isSubmitRequest && (
            <motion.div
               className={styles.overlay}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
            >
               <button
                  className={styles.closeButton}
                  onClick={() =>
                     dispatch(boolSliceAction.toggleIsSubmitRequest())
                  }
                  aria-label='Close Modal'
               >
                  <IoClose size={30} />
               </button>
               <motion.div
                  className={styles.modal}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
               >
                  <h2 className={styles.title}>Submit Your Request</h2>
                  <form onSubmit={handleSubmit}>
                     <input
                        type='text'
                        placeholder='Your Name'
                        className={styles.input}
                        required
                     />
                     <input
                        type='tel'
                        placeholder='Phone Number'
                        className={styles.input}
                        required
                     />
                     <input
                        type='text'
                        placeholder='Profile (Optional)'
                        className={styles.input}
                     />
                     <motion.button
                        type='submit'
                        className={styles.submitButton}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                     >
                        Send Request
                     </motion.button>
                  </form>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default SubmitRequest;
