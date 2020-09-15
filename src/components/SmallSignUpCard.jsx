/** @jsx jsx */
import React, { createRef } from 'react';
import jsx from 'jsx-native-events';
import T from 'prop-types';

import { attrs, insertText } from '../helpers';
import useSubscription from '../services/subscription';
import { HAS_BEEN_SIGNED_UP, UNABLE_TO_SUBSCRIBE } from '../messages';
import CardBlock from './CardBlock.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';

const ACTION = 'Sign Up';

export default function SmallSignUpCard(props) {
  const inputRef = createRef();
  const subscription = useSubscription(props.postUrl, props.postData);

  let { email, error, loading } = subscription;

  function onSubmit(event) {
    const data = event.detail;

    if (data && data.email) {
      subscription.submit(data.email)
        .then(() => {
          props.onSuccess && props.onSuccess(data.email);
        });
    } else {
      inputRef.current.focus();
    }
  }

  return <CardBlock
    bold {...attrs(props)}
    text="left" label="Subscription" flow="row|||column">
    <nu-flow
      width="6sp||5sp|2sp - 2cp"
      text="left|||center" gap="0|||2x" size="t2" color="light-text"
      {...insertText(props.description)} />
    <nu-flow width="4sp||5sp|2sp" gap box="y">
      {
        !email && <nu-form
          display="flex" width="||100% - 2cp" flow="row||column" gap
          onEventInput={onSubmit} space="around">
          <Input
            ref={inputRef}
            color="main-text :invalid[text]"
            disabled={loading || null}
            id="email"
            type="email"
            placeholder="Email"
            grow="1">
          </Input>
          <Button
            action="submit"
            disabled={loading || null}
            width="15x|auto"
            special>
            {props.action || ACTION}
          </Button>
          <nu-check place="right bottom 1.25x 6x||bottom .75x" for="email" assert="email">Email is
            not valid
          </nu-check>
          {
            error &&
            <nu-block width="100%" {...insertText(UNABLE_TO_SUBSCRIBE)}></nu-block>
          }
          {
            loading && <nu-progressbar
              place="outside-bottom 1x" width="100%" is-purple value="100"/>
          }
        </nu-form>
      }
      {
        email && <nu-block radius padding="1.5x" fill="#light.20" as="t2" text="b center">
          <nu-strong>{email}</nu-strong>&nbsp;{ HAS_BEEN_SIGNED_UP }
        </nu-block>
      }
    </nu-flow>
  </CardBlock>;
}

SmallSignUpCard.propTypes = {
  postUrl: T.string,
  postData: T.object,
  onSuccess: T.func,
};
