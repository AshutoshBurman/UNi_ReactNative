package com.calendarnativemodule

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log


class CalendarModule (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CalendarModule"
    }

    @ReactMethod fun createCalendarEvent(name: String, location: String){
        Log.d("CalendarModule", "Create Event called with name: $name and location: $location")
    }

    // @ReactMethod(isBlockingSynchronousMethod = true)


}