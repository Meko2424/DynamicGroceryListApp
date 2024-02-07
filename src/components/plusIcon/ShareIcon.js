import React, {useState, useEffect} from 'react';
import {
  // ... other imports
  Share, // Add Share from react-native
} from 'react-native';

const onShare = async () => {
  try {
    // const sharedItemList = lists.map(item => item.title).join(', '); // Convert list items to a comma-separated string
    // const result = await Share.share({
    //   message: `My Items: ${sharedItemList}`, // Message to be shared
    // });

    const sharedItemList = lists.map(item => item.title).join(', '); // Convert list items to a comma-separated string
    try {
      const result = await Share.share({
        message: `My Items: ${sharedItemList}`, // Message to be shared
      });
    } catch (error) {
      console.error('Error sharing items:', error);
    }

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared successfully
      } else {
        // Shared successfully
      }
    } else if (result.action === Share.dismissedAction) {
      // Share dismissed
    }
  } catch (error) {
    console.error('Error sharing the list: ', error.message);
  }
};
