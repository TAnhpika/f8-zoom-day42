import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({
    primary = false,
    rounded = false,
    bordered = false,
    children,
    href,
    size = "medium",
    className,
    icon,
    leftIcon = icon,
    rightIcon,
    ...passProps
}) {
    const classNames = clsx(styles.wrapper, styles[size], className, {
        [styles.primary]: primary,
        [styles.rounded]: rounded,
        [styles.bordered]: bordered,
    });

    const Component = href ? "a" : "button";

    return (
        // để ...passProps trc để k ghi đè className, logic ,... quan trọng phía sau
        <Component {...passProps} href={href} className={clsx(classNames)}>
            {leftIcon && <FontAwesomeIcon className={styles.icon} icon={leftIcon} />}
            <span>{children}</span>
            {rightIcon && <FontAwesomeIcon className={styles.icon} icon={rightIcon} />}
        </Component>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    bordered: PropTypes.bool,
    href: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
};

export default Button;
