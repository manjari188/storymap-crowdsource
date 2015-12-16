import $ from 'jquery';
import React from 'react'; //eslint-disable-line no-unused-vars
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import PortalStore from 'babel/stores/PortalStore';
import CrowdsourceBuilderAppStore from 'babel/stores/CrowdsourceBuilderAppStore';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const CrowdsourceAppController = class CrowdsourceAppController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onChange = this.onChange.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState() {
    const activeModal = CrowdsourceBuilderAppStore.activeModal;
    const authorized = CrowdsourceBuilderAppStore.authorized;
    const appData = CrowdsourceBuilderAppStore.scratchAppData || AppDataStore.appData;
    let hideBannerContent = false;

    if (activeModal) {
      hideBannerContent = true;
    }
    if (!authorized) {
      hideBannerContent = true;
    }

    return {
      appData: appData.values || appData,
      activeModal,
      hideBannerContent
    };
  }

  mount() {
    // Add listeners
    AppDataStore.addChangeListener(this.onChange);
    PortalStore.addChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  unmount() {
    // Remover listeners
    AppDataStore.removeChangeListener(this.onChange);
    PortalStore.removeChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  onChange(type) {
    switch (type) {
      default:
        const state = this.appState;

        this.emit('state-change',state);
    }
  }

};

export default CrowdsourceAppController;
