package {{configProps.id}}


import android.content.Context
import com.google.android.gms.cast.framework.CastOptions
import com.google.android.gms.cast.framework.media.CastMediaOptions
import com.google.android.gms.cast.framework.media.MediaIntentReceiver
import com.google.android.gms.cast.framework.media.NotificationOptions
import com.reactnative.googlecast.GoogleCastOptionsProvider
import java.util.*


class CastOptionsProvider : GoogleCastOptionsProvider() {
    override fun getCastOptions(context: Context): CastOptions {
         val notificationOptions = NotificationOptions.Builder()
            .setSmallIconDrawableResId(R.drawable.ic_stat_ic_notification)
            .setActions(
                Arrays.asList(MediaIntentReceiver.ACTION_SKIP_NEXT,
                    MediaIntentReceiver.ACTION_TOGGLE_PLAYBACK,
                    MediaIntentReceiver.ACTION_STOP_CASTING), intArrayOf(1, 2))
            .setTargetActivityClassName(
                MainActivity::class.java.name)
            .build()

        val mediaOptions = CastMediaOptions.Builder()
            .setNotificationOptions(notificationOptions)
            .setExpandedControllerActivityClassName(
                MainActivity::class.java.name)
            .build()
        return CastOptions.Builder()
                .setReceiverApplicationId("{{props.applicationID}}")
                .setCastMediaOptions(mediaOptions)
                .build()
    }
}
