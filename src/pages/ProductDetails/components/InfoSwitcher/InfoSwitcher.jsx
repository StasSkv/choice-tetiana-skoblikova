import { Advantages } from '../Advantages/Advantages.jsx';
import { Description } from '../Description/Description.jsx';
import { Actions } from '../Actions/Actions.jsx';
import { useState, useRef, useEffect } from 'react';
import s from './InfoSwitcher.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export const InfoSwitcher = ({ advantagesData, descriptionData, actionsData }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef({});

  useEffect(() => {
    const btn = buttonsRef.current[activeTab];
    if (btn) {
      setIndicatorProps({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return descriptionData && descriptionData.length > 0 ? (
          <Description info={descriptionData} />
        ) : (
          <p>Завантаження опису...</p>
        );

      case 'advantages':
        return advantagesData && advantagesData.length > 0 ? (
          <Advantages info={advantagesData} />
        ) : (
          <p>Завантаження переваг...</p>
        );

      case 'actions':
        return actionsData && actionsData.length > 0 ? (
          <Actions info={actionsData} />
        ) : (
          <p>Завантаження дій...</p>
        );

      default:
        return null;
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.buttons}>
        <button
          ref={(el) => (buttonsRef.current['description'] = el)}
          className={activeTab === 'description' ? s.active : ''}
          onClick={() => setActiveTab('description')}
        >
          Опис
        </button>
        <button
          ref={(el) => (buttonsRef.current['advantages'] = el)}
          className={activeTab === 'advantages' ? s.active : ''}
          onClick={() => setActiveTab('advantages')}
        >
          Переваги
        </button>

        <button
          ref={(el) => (buttonsRef.current['actions'] = el)}
          className={activeTab === 'actions' ? s.active : ''}
          onClick={() => setActiveTab('actions')}
        >
          Дія
        </button>
        <motion.div
          className={s.indicator}
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            left: indicatorProps.left,
            width: indicatorProps.width,
          }}
        />
      </div>

      <div className={s.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
