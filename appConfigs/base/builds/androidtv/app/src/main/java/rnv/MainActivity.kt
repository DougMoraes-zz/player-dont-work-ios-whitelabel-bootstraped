/**
* Override is created because of this module TvRemoteHandlerModule
*/
package {{APPLICATION_ID}}

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.reactnativetvremotehandler.TvRemoteHandlerModule
import android.view.KeyEvent;

{{PLUGIN_ACTIVITY_IMPORTS}}

/**
 * Created by ReNative (https://renative.org)
 */

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String? = "App"

    override fun onCreate(bundle: Bundle?) {
        super.onCreate(null)
        {{PLUGIN_ON_CREATE}}
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        {{PLUGIN_ON_ACTIVITY_RESULT}}
    }

    override fun onNewIntent(intent:Intent) {
      setIntent(intent)
      super.onNewIntent(intent)
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        if (event.action == KeyEvent.ACTION_DOWN && TvRemoteHandlerModule.getInstance() != null) {
            TvRemoteHandlerModule.getInstance().onKeyDownEvent(event);
        }

        return super.dispatchKeyEvent(event);
    }

    {{PLUGIN_ACTIVITY_METHODS}}
}